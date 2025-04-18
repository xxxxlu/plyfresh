const books = [
  {
    "id": 1,
    "title": "Madame Bovary: (Penguin Classics Deluxe Edition)",
    "author": "Gustave Flaubert",
    "price": 1375,
    "image": "https://m.media-amazon.com/images/I/916No2VW0HL._AC_UY436_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "Emma Bovary, a doctor's wife, has extravagant romantic notions that lead her to extramarital affairs and mounting debts, ultimately resulting in tragedy. Flaubert's masterpiece of realism is known for its stylistic perfection.",
    "rating": 4.5,
    "available": true,
    "featured": true
  },
  {
    "id": 2,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "price": 1200,
    "image": "https://m.media-amazon.com/images/I/81aY1lxk+9L._AC_UY436_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. Set in the mid-1930s Alabama, this classic story focuses on the Finch family.",
    "rating": 4.8,
    "available": true,
    "featured": true
  },
  {
    "id": 3,
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "price": 1150,
    "image": "https://m.media-amazon.com/images/I/71GspoOXkeL._AC_UY436_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "The spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class. Can each overcome their own pride and prejudice?",
    "rating": 4.7,
    "available": true,
    "featured": true
  },
  {
    "id": 4,
    "title": "1984",
    "author": "George Orwell",
    "price": 1250,
    "image": "https://m.media-amazon.com/images/I/71rpa1-kyvL._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "In a totalitarian future society, Winston Smith, a low-ranking member of the ruling Party, begins a secret love affair and rebellion against the authoritarian state, risking everything for freedom and truth.",
    "rating": 4.6,
    "available": true,
    "featured": false
  },
  {
    "id": 5,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 1100,
    "image": "https://m.media-amazon.com/images/I/71X7HnBk6VL._AC_UY436_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "Set in the Jazz Age, this novel follows the mysterious millionaire Jay Gatsby and his pursuit of Daisy Buchanan, a wealthy young woman whom he loved in his youth, depicting decadence, idealism, and excess.",
    "rating": 4.5,
    "available": true,
    "featured": false
  },
  {
    "id": 6,
    "title": "Wuthering Heights",
    "author": "Emily Brontë",
    "price": 1180,
    "image": "https://m.media-amazon.com/images/I/81T34Sem-tL._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "A passionate and unresolved love story between the adopted Heathcliff and Catherine Earnshaw, set on the wild Yorkshire moors, crossing generations with themes of revenge and redemption.",
    "rating": 4.4,
    "available": true,
    "featured": true
  },
  {
    "id": 7,
    "title": "Moby-Dick",
    "author": "Herman Melville",
    "price": 1450,
    "image": "https://m.media-amazon.com/images/I/91xNmlf86yL._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "The epic tale of Captain Ahab's obsessive quest for the white whale Moby Dick, a journey of vengeance and madness that explores themes of class, good and evil, and the existence of God.",
    "rating": 4.3,
    "available": true,
    "featured": false
  },
  {
    "id": 8,
    "title": "Jane Eyre",
    "author": "Charlotte Brontë",
    "price": 1300,
    "image": "https://m.media-amazon.com/images/I/81pwJjgcwwL._AC_UY436_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "The story of an orphaned girl's journey to adulthood, her love for Mr. Rochester, and the secrets of Thornfield Hall, exploring themes of passion, independence, and moral growth.",
    "rating": 4.6,
    "available": true,
    "featured": true
  },
  {
    "id": 9,
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "price": 1150,
    "image": "https://m.media-amazon.com/images/I/71nXPGovoTL._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "Narrated by Holden Caulfield, this novel captures the alienation and angst of adolescence as he wanders New York City after being expelled from his prep school, seeking connection in a world of 'phonies'.",
    "rating": 4.2,
    "available": true,
    "featured": false
  },
  {
    "id": 10,
    "title": "The Prophet",
    "author": "Kahlil Gibran",
    "price": 980,
    "image": "https://m.media-amazon.com/images/I/61+8wwQ2JsL._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Poetry",
    "description": "A collection of poetic essays that are philosophical, spiritual, and inspirational. The prophet, Almustafa, shares his wisdom on love, marriage, children, giving, work, joy, sorrow, and other aspects of life.",
    "rating": 4.7,
    "available": true,
    "featured": true
  },
  {
    "id": 11,
    "title": "Crime and Punishment",
    "author": "Fyodor Dostoevsky",
    "price": 1400,
    "image": "https://m.media-amazon.com/images/I/51Vg24nKbPL._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "The psychological account of a poverty-stricken young man's murder of a miserly pawnbroker and his subsequent intellectual and spiritual crisis, exploring morality, redemption, and the human psyche.",
    "rating": 4.5,
    "available": true,
    "featured": false
  },
  {
    "id": 12,
    "title": "Frankenstein",
    "author": "Mary Shelley",
    "price": 1100,
    "image": "https://m.media-amazon.com/images/I/91HvX42+65L._AC_UY436_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "The story of Victor Frankenstein, a scientist who creates a sapient creature in an unorthodox scientific experiment, exploring themes of creation, responsibility, and the dangerous pursuit of knowledge.",
    "rating": 4.3,
    "available": true,
    "featured": false
  },
  {
    "id": 13,
    "title": "War and Peace",
    "author": "Leo Tolstoy",
    "price": 1800,
    "image": "https://m.media-amazon.com/images/I/81W6BFaJJWL._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "An epic novel alternating between the histories of several families during Napoleon's invasion of Russia, exploring themes of love, war, history, and the meaning of life.",
    "rating": 4.7,
    "available": true,
    "featured": true
  },
  {
    "id": 14,
    "title": "The Odyssey",
    "author": "Homer",
    "price": 1250,
    "image": "https://m.media-amazon.com/images/I/81g0AATkO9L._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Poetry",
    "description": "The ancient Greek epic poem following Odysseus's ten-year journey home after the Trojan War, encountering mythical creatures, divine beings, and natural disasters as he attempts to reunite with his family.",
    "rating": 4.6,
    "available": true,
    "featured": false
  },
  {
    "id": 15,
    "title": "Don Quixote",
    "author": "Miguel de Cervantes",
    "price": 1450,
    "image": "https://m.media-amazon.com/images/I/81kIVgGfc+L._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "The story of an aging nobleman who becomes so obsessed with tales of chivalry that he assumes the identity of a knight-errant, embarking on a quest for adventure with his loyal squire Sancho Panza.",
    "rating": 4.4,
    "available": true,
    "featured": true
  },
  {
    "id": 16,
    "title": "Anna Karenina",
    "author": "Leo Tolstoy",
    "price": 1550,
    "image": "https://m.media-amazon.com/images/I/61RXEyMctkL._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "The tragic story of married aristocrat Anna Karenina and her affair with the wealthy Count Vronsky, exploring themes of love, adultery, passion, and the social constraints of Russian society.",
    "rating": 4.6,
    "available": true,
    "featured": false
  },
  {
    "id": 17,
    "title": "Persuasion",
    "author": "Jane Austen",
    "price": 1050,
    "image": "https://m.media-amazon.com/images/I/71c+m80Du+L._AC_UY436_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "Anne Elliot is persuaded to reject a proposal from the man she loves due to his lack of wealth. Years later, he returns as a wealthy naval officer, exploring themes of second chances and societal pressures.",
    "rating": 4.5,
    "available": true,
    "featured": false
  },
  {
    "id": 18,
    "title": "The Brothers Karamazov",
    "author": "Fyodor Dostoevsky",
    "price": 1700,
    "image": "https://m.media-amazon.com/images/I/81XwoNcQbwS._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "The final novel by Dostoevsky revolves around the patricide of Fyodor Karamazov and his three sons, exploring themes of faith, doubt, reason, and the complex nature of human psychology.",
    "rating": 4.7,
    "available": true,
    "featured": true
  },
  {
    "id": 19,
    "title": "One Hundred Years of Solitude",
    "author": "Gabriel García Márquez",
    "price": 1350,
    "image": "https://m.media-amazon.com/images/I/81dy4cfPGuL._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "The multi-generational story of the Buendía family in the fictional town of Macondo, blending magical realism with history to explore themes of time, fate, and the cyclical nature of human experience.",
    "rating": 4.8,
    "available": true,
    "featured": true
  },
  {
    "id": 20,
    "title": "Brave New World",
    "author": "Aldous Huxley",
    "price": 1200,
    "image": "https://m.media-amazon.com/images/I/71GNqqXuN3L._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "Set in a dystopian future where humans are genetically bred and pharmaceutically conditioned for their roles in society, this novel explores the conflict between individual freedom and societal stability.",
    "rating": 4.4,
    "available": true,
    "featured": false
  },
  {
    "id": 21,
    "title": "The Divine Comedy",
    "author": "Dante Alighieri",
    "price": 1500,
    "image": "https://m.media-amazon.com/images/I/91YRDOLJNGL._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Poetry",
    "description": "An epic poem that describes Dante's journey through Hell, Purgatory, and Paradise, guided by the Roman poet Virgil and later by Beatrice, representing an allegorical vision of the afterlife.",
    "rating": 4.6,
    "available": true,
    "featured": false
  },
  {
    "id": 22,
    "title": "The Iliad",
    "author": "Homer",
    "price": 1250,
    "image": "https://m.media-amazon.com/images/I/71FVVdj9w4L._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Poetry",
    "description": "An ancient Greek epic poem set during the Trojan War, focusing on the wrath of Achilles and the battles and events during the weeks of a quarrel between King Agamemnon and the warrior Achilles.",
    "rating": 4.5,
    "available": true,
    "featured": false
  },
  {
    "id": 23,
    "title": "The Aeneid",
    "author": "Virgil",
    "price": 1300,
    "image": "https://m.media-amazon.com/images/I/71oIgUbGkTL._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Poetry",
    "description": "A Latin epic poem that follows the legendary hero Aeneas, a Trojan who traveled to Italy and became the ancestor of the Romans, blending myth with historical events to celebrate Roman civilization.",
    "rating": 4.4,
    "available": true,
    "featured": false
  },
  {
    "id": 24,
    "title": "The Count of Monte Cristo",
    "author": "Alexandre Dumas",
    "price": 1450,
    "image": "https://m.media-amazon.com/images/I/71lpq2Nw7iL._AC_UY436_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "A tale of wrongful imprisonment, escape, treasure, and revenge, following Edmond Dantès as he methodically takes vengeance on those responsible for his unjust fourteen-year imprisonment.",
    "rating": 4.7,
    "available": true,
    "featured": true
  },
  {
    "id": 25,
    "title": "Les Misérables",
    "author": "Victor Hugo",
    "price": 1600,
    "image": "https://m.media-amazon.com/images/I/811Htj5rRkL._AC_UY436_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "A sprawling novel that examines the nature of good and evil, law and grace, following the lives and interactions of several characters, particularly the struggles of ex-convict Jean Valjean and his redemption.",
    "rating": 4.8,
    "available": true,
    "featured": true
  },
  {
    "id": 26,
    "title": "The Picture of Dorian Gray",
    "author": "Oscar Wilde",
    "price": 1100,
    "image": "https://m.media-amazon.com/images/I/61FdXlJX0-L._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "The story of a handsome young man who sells his soul to ensure that a portrait of himself ages while he remains youthful and beautiful, exploring themes of art, beauty, morality, and decadence.",
    "rating": 4.5,
    "available": true,
    "featured": false
  },
  {
    "id": 27,
    "title": "The Metamorphosis",
    "author": "Franz Kafka",
    "price": 950,
    "image": "https://m.media-amazon.com/images/I/61nlvcmPkGL._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "A novella about Gregor Samsa, who wakes one morning to find himself inexplicably transformed into a huge insect, exploring themes of alienation, absurdity, and the human condition.",
    "rating": 4.3,
    "available": true,
    "featured": false
  },
  {
    "id": 28,
    "title": "The Scarlet Letter",
    "author": "Nathaniel Hawthorne",
    "price": 1050,
    "image": "https://m.media-amazon.com/images/I/61iylEmE5kL._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "Set in Puritan Massachusetts, this novel tells the story of Hester Prynne, who conceives a daughter through an affair and struggles to create a new life of repentance and dignity in her community.",
    "rating": 4.2,
    "available": true,
    "featured": false
  },
  {
    "id": 29,
    "title": "The Adventures of Huckleberry Finn",
    "author": "Mark Twain",
    "price": 1150,
    "image": "https://m.media-amazon.com/images/I/91REIV2APtL._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Fiction",
    "description": "The story of young Huck Finn and his friend Jim, a runaway slave, as they journey down the Mississippi River on a raft, exploring themes of racism, friendship, and the moral conflict between societal values and conscience.",
    "rating": 4.5,
    "available": true,
    "featured": false
  },
  {
    "id": 30,
    "title": "The Canterbury Tales",
    "author": "Geoffrey Chaucer",
    "price": 1300,
    "image": "https://m.media-amazon.com/images/I/81HaX7b7Z1L._AC_UL640_FMwebp_QL65_.jpg",
    "category": "Poetry",
    "description": "A collection of 24 stories that depicts a group of pilgrims traveling from London to Canterbury to visit the shrine of Saint Thomas Becket, providing insights into 14th-century English society.",
    "rating": 4.4,
    "available": true,
    "featured": false
  }
]

export default books
