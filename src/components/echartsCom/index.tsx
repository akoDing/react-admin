import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';

interface EChartsComponentProps {
  // 图表配置项
  option: EChartsOption;
  // 组件样式
  style?: React.CSSProperties;
  // 类名
  className?: string;
  // 图表初始化完成回调
  onInitialized?: (instance: ECharts) => void;
  // 窗口大小变化时是否重绘图表
  responsive?: boolean;
}

const EChartsComponent: React.FC<EChartsComponentProps> = ({
  option,
  style = { width: '100%', height: '100%' },
  className,
  onInitialized,
  responsive = true,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ECharts | null>(null);

  // 初始化图表
  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      // 初始化ECharts实例
      chartInstance.current = echarts.init(chartRef.current);
      
      // 设置图表配置
      chartInstance.current.setOption(option);
      
      // 触发初始化完成回调
      if (onInitialized && chartInstance.current) {
        onInitialized(chartInstance.current);
      }
    }

    // 清理函数
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, []);

  // 更新图表配置
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.setOption(option);
    }
  }, [option]);

  // 响应窗口大小变化
  useEffect(() => {
    if (!responsive) return;

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [responsive]);

  return (
    <div
      ref={chartRef}
      style={style}
      className={className}
    />
  );
};

export default EChartsComponent;
