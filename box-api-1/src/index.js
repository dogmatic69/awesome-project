module.exports = (req, res) => {
    return res.send({
        server: 'api-1',
        message: 'Hello, world!',
        error: false,
    });
}