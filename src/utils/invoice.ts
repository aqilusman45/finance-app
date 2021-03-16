export const updateUserBalance = (current: number, subs: number) => {
  return current - subs;
};

export const updateUserBalanceAtEidtInvoice = (
  userBalance: number,
  prevTotal: number,
  newTotal: number
) => {
  if (prevTotal >= newTotal) {
    const result = prevTotal - newTotal;

    if (userBalance >= 0) {
      return userBalance + result;
    } else {
      return result + userBalance;
    }
  } else {
    const result = newTotal - prevTotal;

    if (userBalance >= 0) {
      return userBalance - result;
    } else {
      return userBalance - result;
    }
  }
};

