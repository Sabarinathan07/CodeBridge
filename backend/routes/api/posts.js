import express from "express";
import { check, validationResult } from "express-validator";
import auth from "../../middleware/auth.js";
import Post from "../../models/Post.js";
import User from "../../models/User.js";

const router = express.Router();
// @route POST api/posts
// @description Create a post
// @access Private
router.post(
    "/",
    [auth, [check("text", "Text is required").not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select("-password");

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            });

            const post = await newPost.save();

            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: "Server error Post" });
        }
    }
);

// @route GET api/posts
// @description Get all posts
// @access Private
router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server error Post" });
    }
});

// @route GET api/posts/:id
// @description Get post by id
// @access Private
router.get("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).json({ msg: "Server error Post" });
    }
});

// @route DELETE api/posts
// @description Delete a post
// @access Private
router.delete("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        // Check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not Authorized" });
        }

        await post.remove();

        res.json({ msg: "Post removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).json({ msg: "Server error Post" });
    }
});

// @route PUT api/posts/like/:id
// @description Like a post
// @access Private
router.put("/like/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //check if the post has already been liked 'post.likes.filter(like => like.user.toString() === req.user.id).length > 0
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length > 0
        ) {
            return res.status(400).json({ msg: "Post already liked" });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error Post12");
    }
});

// @route PUT api/posts/unlike/:id
// @description Like a post
// @access Private
router.put("/unlike/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //check if the post has already been liked 'post.likes.filter(like => like.user.toString() === req.user.id).length > 0
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length === 0
        ) {
            return res.status(400).json({ msg: "Post hasn't yet been liked" });
        }

        //Get remove index
        const removeIndex = post.likes.map((like) =>
            like.user.toString().indexOf(req.user.id)
        );

        if (removeIndex < 1) {
            return res
                .status(400)
                .json({ msg: "You have not yet liked this post" });
        }

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server error Post" });
    }
});

// @route POST api/posts/comment/:id
// @description Comment a post
// @access Private
router.post(
    "/comment/:id",
    [auth, [check("text", "Text is required").not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select("-password");

            const post = await Post.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            };

            post.comments.unshift(newComment);

            await post.save();

            res.json(post.comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: "Server error Post" });
        }
    }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @description Delete a comment
// @access Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //Pull out comment
        const comment = post.comments.find(
            (comment) => comment.id === req.params.comment_id
        );

        //make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: "Comment Doesn't Exist" });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not Authorized" });
        }

        //Get remove index
        // const removeIndex = post.comments.map(comment => comment.user.toString().indexOf(req.user.id));
        const removeIndex = post.comments
            .map((comment) => comment.id)
            .indexOf(req.params.comment_id);

        if (removeIndex < 1) {
            return res.status(404).json({ msg: "Comment doesn't exist" });
        }
        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server error Post" });
    }
});

export default router;
