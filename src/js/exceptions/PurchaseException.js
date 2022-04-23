import LottoShop from "../domain/LottoShop.js";

export const PurchseException = {
    outOfRangePurchasePrice() {
        return new Error(
            `구매 금액을 ${LottoShop.PURCHASE_MIN_PRICE} ~ ${LottoShop.PURCHASE_MAX_PRICE}로 입력해주세요!`
        );
    },
    notMatchPurchaseUnit() {
        return new Error(`구매 금액을 ${LottoPurchase.LOTTO_UNIT}원 단위로 입력해주세요.`);
    },
};
