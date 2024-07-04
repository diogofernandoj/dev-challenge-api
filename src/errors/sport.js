export class SportNotFoundError extends Error {
    constructor(sport_id) {
        super(`Sport with id ${sport_id} not found`)
        this.name = 'SportNotFoundError'
    }
}
