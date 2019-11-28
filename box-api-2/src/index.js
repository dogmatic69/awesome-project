module.exports = (req, res) => {
    return res.send({
        server: 'api-2',
        message: 'Hello, world!',
        error: false,
    });
}