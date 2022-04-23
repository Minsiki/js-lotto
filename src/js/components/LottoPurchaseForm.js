export default class LottoPurchaseForm {
    props;
    $element;

    constructor(props) {
        this.props = props;
        this.$element = document.querySelector("#lotto-purchase-area");
        this.#render();
        this.#mounted();
    }

    #render() {
        this.$element.replaceChildren();
        this.$element.insertAdjacentHTML("afterbegin", this.#getTemplate());
    }

    #mounted() {
        this.purchasePriceInput = document.querySelector("#purchase-price-input");
        document.querySelector("#purchase-price-submit").addEventListener("click", () => {
            this.#onPurchaseSubmitClick();
        });
        document.querySelector("#purchase-form").addEventListener("submit", (event) => {
            this.#onSubmit(event);
        });
    }

    #getTemplate() {
        return `
        <form id="purchase-form" class="mt-5" >
            <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요. </label>
            <div class="d-flex">
                <input
                    type="number"
                    id="purchase-price-input"
                    class="w-100 mr-2 pl-2"
                    data-test="purchase-price-input"
                    placeholder="구입 금액"
                    min="1000"
                    max="1000000"
                />
                <button type="button" data-test="purchase-button" id="purchase-price-submit" class="btn btn-cyan">확인</button>
            </div>
        </form>
        `;
    }

    #onPurchaseSubmitClick() {
        this.props.onPurchase(this.purchasePriceInput.value);
    }

    #onSubmit(event) {
        event.preventDefault();
        this.#onPurchaseSubmitClick();
    }

    onReset() {
        this.purchasePriceInput.value = "";
    }
}
