const generateId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `VLK${randomNum}`
}

export { generateId }

