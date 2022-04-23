import LottoReward from "../domain/LottoReward.js";
import LottoShop from "../domain/LottoShop.js";
import LottoTickets from "../domain/LottoTickets.js";
import LottoModal from "./LottoModal.js";
import LottoPurchaseForm from "./LottoPurchaseForm.js";
import LottoTicketsForm from "./LottoTicketsForm.js";
import WinningLottoForm from "./WinningLottoForm.js";

export default class Lotto {
    lottos;
    winningNumbers;
    bonusNumber;
    rating;
    rate;

    components = {};
    domains = {};

    constructor() {
        this.components = {
            lottoPurchaseForm: new LottoPurchaseForm({
                onPurchase: (price) => this.onPurchase(price),
            }),
            lottoTicketsForm: new LottoTicketsForm(),
            winningLottoForm: new WinningLottoForm({
                onReward: (winningNumber, bonusNumber) => this.onReward(winningNumber, bonusNumber),
            }),
            lottoModal: new LottoModal({
                onReset: () => this.onReset(),
            }),
        };

        this.domains = {
            lottoTickets: new LottoTickets(),
            lottoReward: new LottoReward(),
        };
    }

    onPurchase(price) {
        try {
            this.domains.lottoTickets.tickets = LottoShop.buy(price);

            this.onLoadLottoTicketForm();
            this.onLoadWinningForm();
        } catch (error) {
            alert(error.message);
        }
    }

    onLoadLottoTicketForm() {
        this.components.lottoTicketsForm.lottos = this.domains.lottoTickets.tickets;
        this.components.lottoTicketsForm.render();
        this.components.lottoTicketsForm.mounted();
    }

    onLoadWinningForm() {
        this.components.winningLottoForm.render();
        this.components.winningLottoForm.mounted();
    }

    onReward(winningNuber, bonusNumber) {
        this.winningNumbers = winningNuber;
        this.bonusNumber = bonusNumber;

        try {
            this.domains.lottoReward.compute({
                lottos: this.domains.lottoTickets.tickets,
                winningNumbers: this.winningNumbers,
                bonusNumber: this.bonusNumber,
            });
            this.components.lottoModal.rate = this.domains.lottoReward.rate;
            this.components.lottoModal.winnings = this.domains.lottoReward.winnings;
            this.components.lottoModal.render();
            this.components.lottoModal.mounted();
            this.components.lottoModal.onClickOpenResultModalButton();
        } catch (error) {
            alert(error.message);
        }
    }

    onReset() {
        this.domains.lottoTickets = [];
        this.components.lottoPurchaseForm.onReset();
        this.components.lottoTicketsForm.onReset();
        this.components.winningLottoForm.onReset();
        this.components.lottoModal.onReset();
    }
}
