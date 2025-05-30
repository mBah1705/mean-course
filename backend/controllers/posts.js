import Post from '../models/post.js';


export const createPostControllerFn = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename,
        creator: req.userData.userId
    });

    post.save()
        .then(createdPost => {
            res.status(201).json({
                message: 'Post added successfully',
                post: {
                    ...createdPost,
                    id: createdPost._id,
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Creating a post failed!'
            });
        });
    
}

export const getPostsControllerFn =  (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    
    if (pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize); 
    }
    
    postQuery
        .then(documents => {
            fetchedPosts = documents;
            return Post.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                message: 'Posts fetched successfully!',
                posts: fetchedPosts,
                maxPosts: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching posts failed!'
            });
        });
}

export const getPostControllerFn = (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json({message: "Post updated!", post});
            } else {
                res.status(404).json({ message: 'Post not found!' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching post failed!'
            });
        });
}

export const deletePostControllerFn = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
        .then(result => {
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'Post deleted!' });
            } else {
                res.status(401).json({ message: 'Not authorized!' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Deleting posts failed!'
            });
        });
}

export const updatePostControllerFn = (req, res, next) => {
    let imagePath = req.body.imagePath;

    if (req.file) {
        const url = req.protocol + '://' + req.get('host')
        Post.findById(req.params.id).then(post => {
            imagePath = url + '/images/' + req.file.filename;
            post.imagePath = imagePath;
            post.save();
        });
    }

    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath,
        creator: req.userData.userId
    });

    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
        .then(result => {
            if (result.modifiedCount > 0 || result.matchedCount > 0) {
                res.status(200).json({ message: 'Update successful!' });
            } else {
                res.status(401).json({ message: 'Not authorized!' });
            }
        })
        .catch(() => {
            res.status(500).json({
                message: 'Could not update post!'
            });
        });
}

