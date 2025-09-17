declare type Recordable<T = any> = Record<string, any>;

declare interface viteEnv {
    VITE_PORT: number;
    VITE_USE_MOCK: boolean;
    VITE_USE_PROXY: boolean;
    VITE_USE_API: string;
    VITE_USE_CDN: boolean;
    VITE_USE_COMPRESS: boolean;
    VITE_OPEN: boolean;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
}

// menu 菜单类型
declare namespace Menu {
    interface MenuOptions {
        key?: string;
        label?: string;
        path?: string;
        title?: string;
        icon?: string;
        children?: MenuOptions[];
    }
}

// 表单配置项
declare interface FormConfigItem {
    label?: string;
    name?: string;
    type: 'input' | 'radio' | 'select';
    options?: {
        label: string;
        value: any;
    }[];
    placeholder?: string;
}