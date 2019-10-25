const domain = require("../domain/log.domain");

exports.log = (text, metadata = {}) => {
  // eslint-disable-next-line no-console
  console.log(text);

  const data = { text };
  const { userId, customerId, sessionId } = metadata;

  if (userId) {
    data.userId = userId;
  }

  if (customerId) {
    data.customerId = customerId;
  }

  if (sessionId) {
    data.sessionId = sessionId;
  }

  domain.add(data);
};
