import classNames from 'classnames';
import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import './AutoColumnGrid.less';
interface IAutoColumnGridProps {
    className?: string;
    style?: CSSProperties;

    /**
     * 格子最小宽度, 默认200
     */
    minWidth?: number;

    /**
     * 间隔, 默认16
     */
    gap?: number;

    /**
     * 最大列数，不设置则不限制
     */
    maxColumn?: number;

    children?: ReactNode;
}
/**
 * 自动设置列数量的 Grid
 */
const AutoColumnGrid: React.FC<IAutoColumnGridProps> = (props) => {
    const { className, style, minWidth = 200, gap = 16, children, maxColumn } = props;

    const [columnCount, setColumnCount] = useState(4);

    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * 更新
     */
    const updateColumn = () => {
        // 因为 所有格式的宽度 + 所有间隔的宽度 = 容器的宽度
        // 即：columnCount * minWidth + (columnCount - 1) * gap = containerWidth
        // 即：columnCount * (minWidth + gap) - gap = containerWidth
        // 所以：columnCount = (containerWidth + gap) / (minWidth + gap)
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const columnCount = Math.floor((containerWidth + gap) / (minWidth + gap));
            const childrenLength = (children as Array<any>)?.length || 0;
            const effectColumnCount = Math.min(maxColumn || Number.MAX_SAFE_INTEGER, columnCount, childrenLength);

            setColumnCount(effectColumnCount);
        }
    };

    useEffect(() => {
        updateColumn();
        function resizeHandler() {
            updateColumn();
        }

        const proxy = new ResizeObserver(resizeHandler);
        proxy.observe(containerRef.current!);

        return () => {
            proxy.disconnect();
        };
    }, []);

    return (
        <div ref={containerRef} className={classNames('AutoColumnGrid', className)} style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)`, gap, ...style }}>
            {children}
        </div>
    );
};
export default AutoColumnGrid;
