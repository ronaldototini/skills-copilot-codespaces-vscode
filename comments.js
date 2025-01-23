// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

// Endpoint to get all comments
app.get('/comments', async (req, res) => {
    try {
        const comments = await prisma.comment.findMany();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

// Endpoint to create a new comment
app.post('/comments', async (req, res) => {
    const { text } = req.body;
    try {
        const newComment = await prisma.comment.create({
            data: { text },
        });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create comment' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});