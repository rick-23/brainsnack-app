const express = require('express');
const router = express.Router();
const path = require('path');

const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Path to the topics.json file
const dbFilePath = path.join(__dirname, '../data/topics.db.json');

const readTopics = () => {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
};

const writeTopics = (topics) => {
    const db = JSON.stringify(topics, null, 2);
    fs.writeFileSync(dbFilePath, db, 'utf8');
};

// Get all topics
router.get('/', (req, res) => {
    try {
        const topics = readTopics();
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: 'Error reading topics' });
    }
});
// Get a single topic by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    try {
        const topics = readTopics();
        const topic = topics.find(t => t.id === id);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        res.json(topic);
    } catch (error) {
        res.status(500).json({ message: 'Error reading topic' });
    }
});

// Create a new card
router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Topic name is required' });
    }

    const newTopic = {
        id: uuidv4(),
        name,
        date: new Date().toISOString()
    };

    try {
        const topics = readTopics();
        topics.push(newTopic);
        writeTopics(topics);
        res.status(201).json(newTopic);
    } catch (error) {
        res.status(500).json({ message: 'Error saving topic' });
    }
});

// Delete a topic
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    try {
        const topics = readTopics();
        const topicIndex = topics.findIndex(t => t.id === id);

        if (topicIndex === -1) {
            return res.status(404).json({ message: 'topic not found' });
        }

        topics.splice(topicIndex, 1);
        writeTopics(topics);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting topic' });
    }
});

module.exports = router;
