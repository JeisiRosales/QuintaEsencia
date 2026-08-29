import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

// 1. Primitivo base reutilizable
export function Skeleton({ className = '', ...props }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse rounded-xl bg-dark-1/10 ${className}`}
            {...props}
        />
    );
}

// 2. Componente Global de Carga de Página
export function SkeletonPage() {
    return (
        <div className="w-full min-h-screen space-y-8 animate-fade-in pb-12">
            {/* Sección Hero */}
            <section className="w-full mt-20 px-4 md:px-8">
                <div className="relative w-full h-[75vh] min-h-[520px] max-h-[750px] rounded-2xl md:rounded-3xl bg-dark-1/10 animate-pulse p-6 md:p-14 flex flex-col justify-between">
                    <Skeleton className="w-32 h-4 bg-light-1/20" />
                    <div className="space-y-4 max-w-2xl">
                        <Skeleton className="w-3/4 h-10 md:h-14 bg-light-1/20" />
                        <Skeleton className="w-full h-4 md:h-6 bg-light-1/20" />
                    </div>
                </div>
            </section>

            {/* Sección Cita / Texto Central */}
            <section className="w-full bg-light-1 py-10 px-4 md:px-8 border-b border-dark-1/10">
                <div className="max-w-3xl mx-auto text-center space-y-4 flex flex-col items-center">
                    <Skeleton className="w-48 h-4" />
                    <Skeleton className="w-full h-8" />
                    <Skeleton className="w-16 h-[1px] bg-gold/30 mt-4" />
                </div>
            </section>

            {/* Sección Dividida (Split Content) */}
            <section className="w-full bg-olive/20 py-16 lg:py-24 px-4 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-[400px] lg:h-[75vh]">
                    <div className="flex flex-col h-full space-y-6">
                        <Skeleton className="w-40 h-4 bg-light-1/20" />
                        <Skeleton className="flex-1 w-full rounded-[2rem] bg-light-1/10 min-h-[250px]" />
                    </div>
                    <div className="hidden lg:flex flex-col h-full justify-between space-y-4">
                        <Skeleton className="w-full h-1/3 rounded-[2rem] bg-light-1/10" />
                        <Skeleton className="w-full h-1/3 rounded-[2rem] bg-light-1/10 opacity-50" />
                    </div>
                </div>
            </section>

            {/* Sección Grid de Tarjetas */}
            <section className="w-full bg-light-2 py-20 px-4 md:px-8 border-t border-dark-1/10">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center space-y-3 flex flex-col items-center">
                        <Skeleton className="w-44 h-4" />
                        <Skeleton className="w-64 h-8" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <Skeleton className="w-full min-h-[280px] md:min-h-[480px] rounded-2xl md:rounded-3xl" />
                        <Skeleton className="w-full min-h-[280px] md:min-h-[480px] rounded-2xl md:rounded-3xl" />
                    </div>
                </div>
            </section>
        </div>
    );
}