export const formatNumber = (n: number): string => {
  const numbersLetter = [
    "",
    " K",
    " M",
    " B",
    " T",
    " Q",
    " QQ",
    " S",
    " SS",
    " O",
    " N",
    " D",
    " UN",
    " DD",
    " TD",
    " QD",
    " QQD",
    " SD",
    " SSD",
    " OD",
    " ND",
    " V",
  ];

  const number =
    ((Math.log10(n) / 3) | 0) === 0
      ? n
      : Number((n / Math.pow(10, ((Math.log10(n) / 3) | 0) * 3)).toFixed(2));

  if (!numbersLetter[(Math.log10(n) / 3) | 0] && n > 1000) {
    const number_string = n.toLocaleString("fullwide", { useGrouping: false });
    return (
      number_string.substring(
        0,
        number_string.length - (numbersLetter.length * 3 - 3)
      ) + numbersLetter[numbersLetter.length - 1]
    );
  }

  return number + numbersLetter[(Math.log10(n) / 3) | 0];
};
