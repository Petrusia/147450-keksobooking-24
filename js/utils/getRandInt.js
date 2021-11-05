// Функция, возвращающая случайное целое число из переданного диапазона включительно.
export function getRandInt(valueFrom, valueTo) {
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
