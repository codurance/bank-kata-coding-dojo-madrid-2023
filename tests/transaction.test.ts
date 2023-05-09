import fs from "fs-extra";

class TransactionRepository {
    constructor (private fileName: string) {
        fs.ensureFileSync(this.fileName)
        fs.writeFileSync(this.fileName, JSON.stringify([]))
    }

    save(amount: number) {
        const storedFile = fs.readFileSync(this.fileName, 'utf-8')
        const transactions = JSON.parse(storedFile)
        transactions.push({ amount })
        fs.writeFileSync(this.fileName, JSON.stringify(transactions))
    }
}

describe('repository integration test', () => {
    // before -> clean up
    // after -> clean up
    it('should store a json file', () => {
        const fileName = 'database.json'
        const amount = 1000

        const repository = new TransactionRepository(fileName)
        repository.save(amount)

        const storedFile = fs.readFileSync(fileName, 'utf-8')
        expect(JSON.parse(storedFile)).toEqual([ { amount } ])
    })

    it('should save amount when exists previoslly', () => {
        const fileName = 'database.json'
        const repository = new TransactionRepository(fileName)
        const amount = 1000
        fs.writeFileSync(fileName, JSON.stringify([{ amount: 100 }]))

        repository.save(amount)

        const storedFile = fs.readFileSync(fileName, 'utf-8')
        expect(JSON.parse(storedFile)).toEqual([{ amount: 100 }, { amount }])
    })
})
