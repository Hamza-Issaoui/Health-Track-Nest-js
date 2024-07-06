export class NutrientCalculator {
  static calculateCalories(quantity: number, type: string): number {
    switch (type.toLowerCase()) {
      case 'carbohydrates': // French for glucides
      case 'carbohydrate':
      case 'carb':
        return quantity * 4;
      case 'protein': // French for protéine
        return quantity * 4;
      case 'fats': // French for lipides
      case 'fat':
        return quantity * 9;
      case 'sugar': // French for sucre
        return quantity * 4;
      case 'sodium': // Sodium does not contribute to caloric intake
        return 0;
      default:
        return 0; // Other micronutrients like vitamins and minerals don't have calories
    }
  }
}
