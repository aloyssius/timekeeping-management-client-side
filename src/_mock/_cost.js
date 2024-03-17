import { randomInArray } from "./_funcs";
import _mock from "./_mock";

export const costs = ['eatDrink', 'toolMaterial', 'other'];

export const convertCost = (cost) => {
  const [eatDrink, toolMaterial] = costs;

  let convertedCost;

  switch (cost) {
    case eatDrink:
      convertedCost = 'Ăn uống';
      break;
    case toolMaterial:
      convertedCost = 'Vật liệu, dụng cụ';
      break;
    default:
      convertedCost = 'Chi phí phát sinh khác';
  }

  return convertedCost;
}

export const _cost = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  costType: convertCost(randomInArray(costs)),
  total: 100000 + index
}));

