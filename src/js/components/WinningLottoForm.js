import { MESSAGE } from "../constant/index.js";

export class WinningLottoForm {
    props = null;
    winningNumbers = null;
    bonusNumber = null;
    winningLotto = null;

    constructor($winngingArea, winningLotto, props) {
        this.$winngingArea = $winngingArea;
        this.props = props;

        this.winningLotto = winningLotto;
    }

    render() {
        this.$winngingArea.innerHTML = this.getWinningTemplate();
    }

    mounted() {
        this.$resultModalOpenButton = document.querySelector("#open-result-modal-button");
        this.$winningNumbers = document.querySelectorAll(".winning-number");
        this.$bonusNumber = document.querySelector(".bonus-number");
    }

    setEvent() {
        this.$resultModalOpenButton.addEventListener("click", (event) => {
            this.#setWinningNumbers(this.#parseWinningNumbers());
            this.#setBonusNumber(this.$bonusNumber.value);

            this.winningLotto.setWinningNumbers(this.getWinningNumbers());
            this.winningLotto.setBonus(this.getBonusNumber());
            this.props.onWinngingCheck();
        });
    }

    getWinningNumbers() {
        return this.winningNumbers;
    }

    #parseWinningNumbers() {
        return Array.from(this.$winningNumbers)
            .map((number) => {
                return number.value;
            })
            .filter((number) => number !== "");
    }

    #setWinningNumbers(winningNumbers) {
        this.winningNumbers = winningNumbers;
    }

    getBonusNumber() {
        return this.bonusNumber;
    }

    #setBonusNumber(number) {
        this.bonusNumber = number;
    }

    getWinningTemplate() {
        return `
        <form class="mt-9">
            <label class="flex-auto d-inline-block mb-3">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
            <div class="d-flex">
                <div>
                    <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                    <div>
                        <input type="number" class="winning-number mx-1 text-center"/>
                        <input type="number" class="winning-number mx-1 text-center"/>
                        <input type="number" class="winning-number mx-1 text-center"/>
                        <input type="number" class="winning-number mx-1 text-center"/>
                        <input type="number" class="winning-number mx-1 text-center"/>
                        <input type="number" class="winning-number mx-1 text-center"/>
                    </div>
                </div>
                <div class="bonus-number-container flex-grow">
                    <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                    <div class="d-flex justify-center">
                        <input type="number" class="bonus-number text-center" />
                    </div>
                </div>
            </div>
            <button type="button" id="open-result-modal-button" class="open-result-modal-button mt-5 btn btn-cyan w-100">결과 확인하기</button>
        </form>`;
    }
}
