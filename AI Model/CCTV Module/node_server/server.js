const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

const doctorLogs = {};

app.post('/api/logs', (req, res) => {
    const logMessage = req.body.log;
    console.log(logMessage);
    const doctorDetails = extractDoctorDetails(logMessage);

    // Create an entry in the logs for the specific doctor
    if (doctorDetails) {
        if (!doctorLogs[doctorDetails.doctorId]) {
            doctorLogs[doctorDetails.doctorId] = [];
        }

        // Update log message to include fixed location "Entry Gate 1"
        const updatedLogMessage = `${logMessage} at Entry Gate 1`;

        doctorLogs[doctorDetails.doctorId].push(updatedLogMessage);
        console.log(`Received log for Doctor ${doctorDetails.doctorId}: ${updatedLogMessage}`);
    }

    res.sendStatus(200); // Send a success status back to the Python script
});

// API endpoint to retrieve logs for a specific doctor
app.get('/api/logs/:doctorId', (req, res) => {
    const doctorId = req.params.doctorId;

    // Retrieve logs for the specific doctor
    const logs = doctorLogs[doctorId] || [];
    res.json({ doctorId, logs });
});

// API endpoint to retrieve logs for a specific doctor
app.get('/', (req, res) => {
    res.json({
        data : "got"
    })
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Function to extract doctor details from the log message
function extractDoctorDetails(logMessage) {
    // Assuming the log message format is "Time: HH:MM:SS - Dr.Name (ID: 1) entered/exited"
    const match = logMessage.match(/Time: (\d+:\d+:\d+) - Dr\.(\w+) \(ID: (\d+)\) (\w+)/);

    if (match) {
        const time = match[1];
        const doctorName = match[2];
        const doctorId = match[3];
        const action = match[4];
        return { doctorName, doctorId, action, time };
    }

    return null;
}
