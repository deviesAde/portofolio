'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GitHubContributionGraph = ({ username }) => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalContributions, setTotalContributions] = useState(0);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const response = await fetch(
                    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
                );
                const data = await response.json();
                setContributions(data.contributions);

                const total = data.contributions.reduce((sum, day) => sum + day.count, 0);
                setTotalContributions(total);

                calculateStreaks(data.contributions);
            } catch (error) {
                console.error('Error fetching contributions:', error);
                setContributions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();
    }, [username]);

    const calculateStreaks = (contribs) => {
        let current = 0;
        let longest = 0;
        let tempStreak = 0;

        const reversed = [...contribs].reverse();

        reversed.forEach((day) => {
            if (day.count > 0) {
                tempStreak++;
                if (tempStreak > longest) longest = tempStreak;
            } else {
                if (current === 0) current = tempStreak;
                tempStreak = 0;
            }
        });

        if (current === 0) current = tempStreak;
        setCurrentStreak(current);
        setLongestStreak(longest);
    };

    const getColor = (count) => {
        if (count === 0) return 'bg-purple-100 dark:bg-purple-950/30';
        if (count <= 2) return 'bg-purple-300 dark:bg-purple-900/50';
        if (count <= 4) return 'bg-purple-400 dark:bg-purple-800';
        if (count <= 6) return 'bg-purple-500 dark:bg-purple-700';
        if (count <= 8) return 'bg-purple-600 dark:bg-purple-600';
        return 'bg-purple-700 dark:bg-purple-500';
    };

    const getTooltipText = (day) => {
        return `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${day.date}`;
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-20 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (contributions.length === 0) {
        return (
            <div className="py-12 text-center bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <p className="text-slate-600 dark:text-slate-400 mb-4">Unable to load GitHub contribution data</p>
                <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-slate-50 dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors duration-200"
                >
                    View Profile
                </a>
            </div>
        );
    }

    const weeks = [];
    for (let i = 0; i < contributions.length; i += 7) {
        weeks.push(contributions.slice(i, i + 7));
    }

    const recentWeeks = weeks.slice(-12);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center gap-4">
                <div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Contribution Activity</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">Last 12 weeks</p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                    <StatCardInline title="Total" value={totalContributions.toLocaleString()} />
                    <div className="w-px h-8 bg-purple-200 dark:bg-purple-800"></div>
                    <StatCardInline title="Current Streak" value={`${currentStreak}d`} />
                    <div className="w-px h-8 bg-purple-200 dark:bg-purple-800"></div>
                    <StatCardInline title="Longest Streak" value={`${longestStreak}d`} />
                    <div className="w-px h-8 bg-purple-200 dark:bg-purple-800"></div>
                    <StatCardInline title="Daily Avg" value={(totalContributions / 84).toFixed(1)} />
                </div>
            </div>

            <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-2xl p-8 border border-purple-200 dark:border-purple-800 shadow-lg">
                <div className="flex items-start justify-center gap-4 min-w-max">
                    <div className="flex flex-col gap-1.5 pt-8">
                        {recentWeeks.map((week, weekIndex) => {
                            if (weekIndex % 4 === 0) {
                                const monthIndex = Math.floor(weekIndex / 4);
                                return (
                                    <div key={`month-${weekIndex}`} className="text-sm text-purple-600 dark:text-purple-400 h-5 font-semibold">
                                        {months[monthIndex % 12]}
                                    </div>
                                );
                            }
                            return <div key={`space-${weekIndex}`} className="h-5" />;
                        })}
                    </div>

                    <div className="flex gap-1.5">
                        {recentWeeks.map((week, weekIndex) => (
                            <motion.div
                                key={`week-${weekIndex}`}
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.05, delayChildren: weekIndex * 0.1 } }
                                }}
                                className="flex flex-col gap-1.5"
                            >
                                {week.map((day, dayIndex) => (
                                    <motion.div
                                        key={`day-${weekIndex}-${dayIndex}`}
                                        variants={{
                                            hidden: { scale: 0, opacity: 0 },
                                            visible: { scale: 1, opacity: 1 }
                                        }}
                                        className={`w-5 h-5 ${getColor(day.count)} rounded transition-all duration-200 hover:scale-125 hover:shadow-lg hover:shadow-purple-500/50 cursor-pointer relative group`}
                                        title={getTooltipText(day)}
                                    >
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10 pointer-events-none">
                                            <div className="bg-purple-900 dark:bg-purple-100 text-purple-50 dark:text-purple-900 text-xs rounded-lg px-3 py-2 whitespace-nowrap font-medium shadow-lg">
                                                {getTooltipText(day)}
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-purple-900 dark:border-t-purple-100" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-1.5 ml-3 pt-8">
                        {['Mon', '', 'Wed', '', 'Fri', ''].map((day, index) => (
                            <div key={`day-label-${index}`} className="text-sm text-purple-600 dark:text-purple-400 h-5 font-semibold">
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-purple-200 dark:border-purple-800 flex flex-col items-center gap-4">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Activity Level:</span>
                    <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 bg-purple-100 dark:bg-purple-950/30 rounded" title="None" />
                        <div className="w-4 h-4 bg-purple-300 dark:bg-purple-900/50 rounded" title="Low" />
                        <div className="w-4 h-4 bg-purple-500 dark:bg-purple-700 rounded" title="Medium" />
                        <div className="w-4 h-4 bg-purple-700 dark:bg-purple-500 rounded" title="High" />
                    </div>
                </div>

                <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View GitHub Profile
                </a>
            </div>
        </div>
    );
};

const StatCardInline = ({ title, value }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-1"
        >
            <p className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">{title}</p>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-50">{value}</p>
        </motion.div>
    );
};

export default GitHubContributionGraph;
