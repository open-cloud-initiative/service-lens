'use client'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { PREFERENCE_DEFAULTS } from '@/lib/preferences/preferences-config'
import { PreferencesStoreProvider } from '@/stores/preferences/preferences-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ThemeProviderProps } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { useState } from 'react'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const { theme_mode, theme_preset, content_layout, navbar_style, sidebar_variant, sidebar_collapsible } =
        PREFERENCE_DEFAULTS

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000, // 1 minute
                        gcTime: 5 * 60 * 1000, // 5 minutes
                    },
                },
            }),
    )

    return (
        <QueryClientProvider client={queryClient}>
            <PreferencesStoreProvider
                themeMode={theme_mode}
                themePreset={theme_preset}
                contentLayout={content_layout}
                navbarStyle={navbar_style}
                {...props}
            >
                <TooltipProvider delayDuration={120}>
                    <NuqsAdapter>{children}</NuqsAdapter>
                </TooltipProvider>
                <Toaster />
            </PreferencesStoreProvider>
        </QueryClientProvider>
    )
}
