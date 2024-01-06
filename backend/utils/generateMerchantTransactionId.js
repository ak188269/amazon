const uuid = require('uuid');
function generateMerchantTransactionId() {
    // Generate a unique identifier
    const uniqueId = uuid.v4().replace(/-/g, ''); // Remove hyphens
  
    // Get the current timestamp
    const timestamp = Date.now();
  
    // Combine the timestamp and unique identifier
    const merchantTransactionId = `${timestamp}${uniqueId}`;
  
    // Ensure the length is less than 36 characters
    return merchantTransactionId.slice(0, 30);
  }

module.exports = generateMerchantTransactionId;
