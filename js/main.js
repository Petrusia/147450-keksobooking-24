// Функция, возвращающая случайное целое число из переданного диапазона включительно.
function getRandInt(valueFrom, valueTo) {
  // Определить, является ли аргумент конечным числом
  if (!Number.isFinite(valueFrom) || !Number.isFinite(valueTo)) {
    throw new Error('Значения должны быть числом');
  }
  // диапазон может быть только положительный, включая ноль
  if (valueFrom < 0 || valueTo < 0) {
    throw new Error('Значения должны быть равными нулю или больше нуля');
  }
  //  если передать значение «до» равное значению «от»
  if (valueFrom === valueTo) {
    throw new Error('Значения не должны быть равными');
  }
  // если передать значение «до» меньшее, чем значение «от»
  const [min, max] = valueFrom > valueTo ? [Math.ceil(valueTo), Math.floor(valueFrom)] : [Math.ceil(valueFrom), Math.floor(valueTo)];
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
function getRandFloat(valueFrom, valueTo, digitsAfterComma = 0) {
  // Определить, является ли аргумент конечным числом
  if (!Number.isFinite(valueFrom) || !Number.isFinite(valueTo) || !Number.isFinite(digitsAfterComma)) {
    throw new Error('Значения должны быть числом');
  }
  // диапазон может быть только положительный, включая ноль
  if (valueFrom < 0 || valueTo < 0) {
    throw new Error('Значения должны быть равными нулю или больше нуля');
  }
  //  если передать значение «до» равное значению «от»
  if (valueFrom === valueTo) {
    throw new Error('Значения не должны быть равными');
  }

  digitsAfterComma = Math.floor(digitsAfterComma);
  // Количество цифр после десятичной запятой; может быть значением между 0 и 20 включительно,
  // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
  if (digitsAfterComma < 0 || digitsAfterComma > 20) {
    throw new Error('Значения может быть значением между 0 и 20 включительно');
  }
  // если передать значение «до» меньшее, чем значение «от»
  const [min, max] = valueFrom > valueTo ? [valueTo, valueFrom] : [valueFrom, valueTo];
  const result = Math.random() * (max - min) + min;
  return Number(result.toFixed(digitsAfterComma));
}


getRandInt(1, 5);
getRandFloat(1, 5, 2);
