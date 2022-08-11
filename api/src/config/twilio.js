const TWILIO_ID = 'AC65f2db15a6ae7f3f4af229f6f5529027';
const TWILIO_SK = '50c1d6afe938c7587b64eafbf87e604b';

const client = require('twilio')(TWILIO_ID,TWILIO_SK); 

client.messages
    .create({
        // from: 'whatsapp:+14155238886',
        from: 'whatsapp:+51916487602',
        body: `Te quitas a jugar`,

        to: 'whatsapp:+51912278246  '
    })
    .then(message => console.log(message.sid));