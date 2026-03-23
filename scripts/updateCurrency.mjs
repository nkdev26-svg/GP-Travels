import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Fetching tours to update currency...');
  const tours = await prisma.tour.findMany();
  for (const tour of tours) {
    if (tour.price && tour.price.includes('$')) {
      const newPrice = tour.price.replace(/\$/g, '₹');
      await prisma.tour.update({
        where: { id: tour.id },
        data: { price: newPrice }
      });
      console.log(`Updated Tour ${tour.id}: ${tour.price} -> ${newPrice}`);
    }
  }

  console.log('Fetching cars to update currency...');
  const cars = await prisma.car.findMany();
  for (const car of cars) {
    if (car.hourlyPrice && car.hourlyPrice.includes('$')) {
      const newPrice = car.hourlyPrice.replace(/\$/g, '₹');
      await prisma.car.update({
        where: { id: car.id },
        data: { hourlyPrice: newPrice }
      });
      console.log(`Updated Car ${car.id}: ${car.hourlyPrice} -> ${newPrice}`);
    }
  }
}

main()
  .then(() => console.log('Currency update complete!'))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
