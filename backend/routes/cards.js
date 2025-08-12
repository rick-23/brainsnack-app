const express = require('express');
const router = express.Router();
const path = require('path');

const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Path to the cards.json file
const dbFilePath = path.join(__dirname, '../data/cards.db.json');

const readCards = () => {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
};

const writeCards = (cards) => {
    const db = JSON.stringify(cards, null, 2);
    fs.writeFileSync(dbFilePath, db, 'utf8');
};

// Get all cards
router.get('/', (req, res) => {
    try {
        const cards = readCards();
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Error reading cards' });
    }
});
// Get a single card by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    try {
        const cards = readCards();
        const card = cards.find(card => card.id === id);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.json(card);
    } catch (error) {
        res.status(500).json({ message: 'Error reading card' });
    }
});

// Create a new card
router.post('/', (req, res) => {
    const { title, topic, content, status } = req.body;
    if (!title || !topic || !content || !status) {
        return res.status(400).json({ message: 'Title, Topic, Content and Status are required' });
    }

    const newCard = {
        id: uuidv4(),
        title,
        topic,
        content,
        status,
        date: new Date().toISOString()
    };

    try {
        const cards = readCards();
        cards.push(newCard);
        writeCards(cards);
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: 'Error saving card' });
    }
});

// Update a card
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { title, topic, content, status } = req.body;

    if (!title || !topic || !content || !status) {
        return res.status(400).json({ message: 'Title, Topic, Content and Status are required' });
    }

    try {
        const cards = readCards();
        const cardIndex = cards.findIndex(card => card.id === id);

        if (cardIndex === -1) {
            return res.status(404).json({ message: 'Card not found' });
        }

        cards[cardIndex] = { ...cards[cardIndex], title, topic, content, status };
        writeCards(cards);
        res.json(cards[cardIndex]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating card' });
    }
});

// Delete a card
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    try {
        const cards = readCards();
        const cardIndex = cards.findIndex(card => card.id === id);

        if (cardIndex === -1) {
            return res.status(404).json({ message: 'card not found' });
        }

        cards.splice(cardIndex, 1);
        writeCards(cards);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting card' });
    }
});

module.exports = router;
