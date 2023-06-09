/*
 Title: 
 if "", the backend function will turn it to null and pass
 */
CREATE TABLE picture (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) DEFAULT 'Untitled',
    about VARCHAR(255),
    category ENUM(
        'cg-paint-left',
        'cg-paint-right',
        'cg-graph',
        'trad',
        'stories',
        'no-category',
        'page'
    ) NOT NULL DEFAULT 'no-category',
    pictureName VARCHAR(255) NOT NULL,
    previewName VARCHAR(255) DEFAULT NULL,
    series VARCHAR(255) DEFAULT 'stand-alone',
    created VARCHAR(255),
    redraw BOOLEAN DEFAULT false,
    hide BOOLEAN DEFAULT false,
    UNIQUE(category, pictureName),
    UNIQUE(previewName)
);