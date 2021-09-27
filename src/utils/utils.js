const getMaskedAddress = (accountNumber, start = 10, end = 32) => {
  return accountNumber.replace(accountNumber.substring(start, end), "*******");
};

export { getMaskedAddress };
