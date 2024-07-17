import { FeColorMatrixProps as FeColorMatrixComponentProps } from '../../elements/filters/FeColorMatrix';
import { FeGaussianBlurProps as FeGaussianBlurComponentProps } from '../../elements/filters/FeGaussianBlur';
import { FeOffsetProps as FeOffsetComponentProps } from '../../elements/filters/FeOffset';
import { NativeProps as FeColorMatrixNativeProps } from '../../fabric/FeColorMatrixNativeComponent';
import { NativeProps as FeGaussianBlurNativeProps } from '../../fabric/FeGaussianBlurNativeComponent';
import { NativeProps as FeOffsetNativeProps } from '../../fabric/FeOffsetNativeComponent';
import { NumberProp } from './types';

const spaceReg = /\s+/;

interface FilterPrimitiveCommonProps {
  x?: NumberProp;
  y?: NumberProp;
  width?: NumberProp;
  height?: NumberProp;
  result?: string;
}

export const extractFilter = (
  props: FilterPrimitiveCommonProps
): FilterPrimitiveCommonProps => {
  const { x, y, width, height, result } = props;
  const extracted: FilterPrimitiveCommonProps = {
    x,
    y,
    width,
    height,
    result,
  };

  return extracted;
};

export const extractFeColorMatrix = (
  props: FeColorMatrixComponentProps
): FeColorMatrixNativeProps => {
  const extracted: FeColorMatrixNativeProps = {};

  if (props.in) {
    extracted.in1 = props.in;
  }
  if (props.values !== undefined) {
    if (Array.isArray(props.values)) {
      extracted.values = props.values;
    } else if (typeof props.values === 'number') {
      extracted.values = [props.values];
    } else if (typeof props.values === 'string') {
      extracted.values = props.values
        .split(spaceReg)
        .map(parseFloat)
        .filter((el: number) => !isNaN(el));
    } else {
      console.warn('Invalid value for FeColorMatrix `values` prop');
    }
  }
  if (props.type) extracted.type = props.type;

  return extracted;
};

export const extractFeGaussianBlur = (
  props: FeGaussianBlurComponentProps
): FeGaussianBlurNativeProps => {
  const extracted: FeGaussianBlurNativeProps = {};

  if (props.in) extracted.in1 = props.in;
  if (props.stdDeviation !== undefined) {
    if (
      typeof props.stdDeviation === 'number' ||
      (typeof props.stdDeviation === 'string' &&
        !props.stdDeviation.match(spaceReg))
    ) {
      extracted.stdDeviationX = Number(props.stdDeviation) || 0;
      extracted.stdDeviationY = Number(props.stdDeviation) || 0;
    } else {
      const stdDeviation = props.stdDeviation.split(spaceReg);
      extracted.stdDeviationX = Number(stdDeviation[0]) || 0;
      extracted.stdDeviationY = Number(stdDeviation[1]) || 0;
    }
  }
  if (props.edgeMode) extracted.edgeMode = props.edgeMode;
  return extracted;
};

export const extractFeOffset = (
  props: FeOffsetComponentProps
): FeOffsetNativeProps => {
  const extracted: FeOffsetNativeProps = {};

  if (props.in) extracted.in1 = props.in;
  if (props.dx) extracted.dx = props.dx;
  if (props.dy) extracted.dy = props.dy;

  return extracted;
};