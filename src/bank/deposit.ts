
export function deposit(amount: number, transactionsRepository: { save: (amount: number) => void }) {
    transactionsRepository.save(amount);
}
