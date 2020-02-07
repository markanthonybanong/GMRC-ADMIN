import { Deck } from '../../../types/room/deck';
import { Bedspace } from '../../../types/room/bedspace';



export function setBedBody(bed: Bedspace): object {
  const decks: Array<Deck> = [];
  bed.decks.map(deck => {
    decks.push({
      number: deck.number,
      status: deck.status,
      dueRentDate: deck.dueRentDate,
      tenantObjectId: deck.tenantObjectId,
      away: deck.away,
      riceCookerBill: deck.riceCookerBill,
      monthlyRent: deck.monthlyRent,
    });
  });
  return {
    number: bed.number,
    decks,
  };
}
