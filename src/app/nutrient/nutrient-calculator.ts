export class NutrientCalculator {
    static calculateCalories(quantity: number, type: string): number {
      switch (type.toLowerCase()) {
        case 'carbohydrate':
        case 'carb':
          return quantity * 4;
        case 'protein':
          return quantity * 4;
        case 'fat':
          return quantity * 9;
        case 'alcohol':
          return quantity * 7;
        default:
          return 0; // Micronutrients like vitamins and minerals don't have calories
      }
    }
  }
  