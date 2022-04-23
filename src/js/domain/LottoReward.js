import LottoShop from "./LottoShop.js";

export default class LottoReward {
    rate;
    winnings;

    static getWinning(count, price) {
        return {
            count: count,
            price: price,
        };
    }

    constructor() {
        this.setWinnings();
    }

    setWinnings() {
        this.winnings = {
            0: LottoReward.getWinning(0, 0),
            1: LottoReward.getWinning(0, 0),
            2: LottoReward.getWinning(0, 0),
            3: LottoReward.getWinning(0, 5_000),
            4: LottoReward.getWinning(0, 50_000),
            5: LottoReward.getWinning(0, 1_500_000),
            "5+": LottoReward.getWinning(0, 30_000_000),
            6: LottoReward.getWinning(0, 2_000_000_000),
        };
    }

    compute(props) {
        this.lottos = props.lottos;
        this.winningNumbers = props.winningNumbers;
        this.bonusNumber = props.bonusNumber;

        this.setWinnings();
        this.computeRating();
        this.computeRate();
    }

    computeRating() {
        this.lottos
            .map((lotto) => lotto.filter((v) => this.winningNumbers.includes(v)))
            .map((r, i) =>
                r.length === 5 && this.lottos.tickets[i].includes(this.bonusNumber)
                    ? this.winnings[r.length + "+"].count++
                    : this.winnings[r.length + ""].count++
            );
    }

    computeRate() {
        let total = 0;

        for (const [key, value] of Object.entries(this.winnings)) {
            total += value.price * value.count;
        }

        this.rate = (total / (this.lottos.length * LottoShop.LOTTO_UNIT)) * 100;
    }
}
