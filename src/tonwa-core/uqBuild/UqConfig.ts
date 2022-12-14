
export interface DevConfig {
    name: string;
    alias?: string;
    memo?: string;
}

export interface UqConfig {
    dev: DevConfig;
    name: string;
    alias?: string;
    version?: string;
    memo?: string;
    "id-only"?: boolean;
}

export const tsHeader = `//=== UqApp builder created on ${new Date()} ===//`;
