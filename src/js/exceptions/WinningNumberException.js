import LottoNumber from "../domain/LottoNumber.js";

export const WinningNumberException = {
    outOfRangeWinningNumber() {
        return new Error(`당첨 번호는 ${LottoNumber.MIN} ~ ${LottoNumber.MAX} 사이로 입력해야합니다.`);
    },
    outOfRangeBonusNumber() {
        return new Error(`보너스 번호는 ${LottoNumber.MIN} ~ ${LottoNumber.MAX} 사이로 입력해야합니다.`);
    },
    notExistWinningNumber() {
        return new Error("입력되지 않은 당첨 번호가 존재합니다.");
    },
    notExistBonusNumber() {
        return new Error("보너스 번호가 입력되지 않았습니다.");
    },
    duplicateWinningNumber() {
        return new Error("중복되는 당첨번호가 존재합니다.");
    },
    duplicateBonusNumber() {
        return new Error("보너스 번호가 중복됩니다.");
    },
};
