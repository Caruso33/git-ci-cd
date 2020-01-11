const exec = require('child_process').exec;

const errorResponse = (error, res) => {
    res.status(500).json({ error: error })
}

const stdErrResponse = (stderr, res) => {
    res.status(500).json({ error: stderr });
}

const successResponse = (stdout, res) => {
    res.status(200).json({ message: stdout });
}

const runCommand = (command, res, customSuccess, args=[]) => {
    const execCallback = (error, stdout, stderr) => {
        if (error) errorResponse(error, res);
        if (stderr) stdErrResponse(stderr, res);
        if (customSuccess) {
            customSuccess(...args);
        } else {
            successResponse(stdout, res);
        }
    }

    exec(command, execCallback);
}

module.exports = runCommand;