// Concepts and colors from:
//    https://codepen.io/justgooddesign/pen/Ghkjx
//    https://codepen.io/billyysea/pen/whjbK

const colorGradients = [
  '#00000c  0%, #00000c 100%',
  '#020111 85%, #191621 100%',
  '#020111 60%, #20202c 100%',
  '#020111 10%, #3a3a52 100%',
  '#20202c  0%, #515175 100%',
  '#40405c  0%, #6f71aa  80%, #8a76ab 100%',
  '#4a4969  0%, #7072ab  50%, #cd82a0 100%',
  '#757abf  0%, #8583be  60%, #eab0d1 100%',
  '#82addb  0%, #ebb2b1 100%',
  '#94c5f8  1%, #a6e6ff  70%, #b1b5ea 100%',
  '#b7eaff  0%, #94dfff 100%',
  '#9be2fe  0%, #67d1fb 100%',
  '#90dffe  0%, #38a3d1 100%',
  '#57c1eb  0%, #246fa8 100%',
  '#2d91c2  0%, #1e528e 100%',
  '#2473ab  0%, #1e528e  70%, #5b7983 100%',
  '#1e528e  0%, #265889  50%, #9da671 100%',
  '#1e528e  0%, #728a7c  50%, #e9ce5d 100%',
  '#154277  0%, #576e71  30%, #e1c45e  70%, #b26339 100%',
  '#163C52  0%, #4F4F47  30%, #C5752D  60%, #B7490F  80%, #2F1107 100%',
  '#071B26  0%, #071B26  30%, #8A3B12  80%, #240E03 100%',
  '#010A10 30%, #59230B  80%, #2F1107 100%',
  '#090401 50%, #4B1D06 100%',
  '#00000c 80%, #150800 100%',
];

type ColorWithStop = {
  color: string;
  stop: string;
};

function getColors(hour: number) {
  const currentColor = colorGradients[hour % 24];
  const nextColor = colorGradients[(hour + 1) % 24];

  return { currentColor, nextColor };
}

function hexToRGB(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function extractColorsWithStops(gradient: string): ColorWithStop[] {
  const pattern = /#[a-fA-F0-9]{6}\s*\d*%/g;
  const matches = gradient.match(pattern);

  if (matches === null) {
    return [];
  }

  return matches.map((match) => {
    const parts = match.split(/\s+/);
    return {
      color: hexToRGB(parts[0]),
      stop: parts[1] || '',
    };
  });
}

function reconstructGradient(
  colorsWithStops: ColorWithStop[],
  alpha: number
): string {
  return colorsWithStops
    .map(({ color, stop }) => `${adjustAlpha(color, alpha)} ${stop}`)
    .join(',');
}

function adjustAlpha(color: string, alpha: number): string {
  return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
}

function getTransitionPercentage(minutes: number, seconds: number): number {
  return ((minutes * 60 + seconds) / 3600) * 100;
}

const generateGradient = (currentTime: Date): string => {
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const colors = getColors(hours);
  const transitionPercentage = getTransitionPercentage(minutes, seconds);
  const nextAlpha = transitionPercentage / 100;

  // Extract and convert the color stops from the current and next gradients
  const nextColorsWithStops = extractColorsWithStops(colors.nextColor);

  // Adjust alpha and reconstruct the gradients

  const adjustedNextGradient = reconstructGradient(
    nextColorsWithStops,
    nextAlpha
  );

  // Combine the gradients with the adjusted alpha channels
  const combinedGradient =
    'linear-gradient(in lch, ' +
    adjustedNextGradient +
    '), linear-gradient(in lch, ' +
    colors.currentColor +
    ')';
  return combinedGradient;
};

export default generateGradient;
