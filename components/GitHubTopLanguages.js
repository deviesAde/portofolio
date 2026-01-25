'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GitHubTopLanguages = ({ username, token }) => {
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const headers = token ? { Authorization: `token ${token}` } : {};

                // Fetch up to 100 public repos to get a good sample
                const response = await fetch(
                    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
                    { headers }
                );

                if (!response.ok) throw new Error('Failed to fetch user repositories');
                const repos = await response.json();

                // Aggregate primary languages
                const languageCounts = {};
                let totalReposWithLang = 0;

                repos.forEach(repo => {
                    if (repo.language) {
                        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
                        totalReposWithLang++;
                    }
                });

                // Convert to array and sort by count
                const sortedLanguages = Object.entries(languageCounts)
                    .map(([name, count]) => ({
                        name,
                        count,
                        percentage: Math.round((count / totalReposWithLang) * 100)
                    }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 8); // Top 8 languages

                setLanguages(sortedLanguages);
                setError(null);
            } catch (err) {
                console.error('Error fetching languages:', err);
                setError('Failed to aggregate language data');
            } finally {
                setLoading(false);
            }
        };

        fetchLanguages();
    }, [username, token]);

    const getLanguageColor = (lang) => {
        const colors = {
            JavaScript: '#f7df1e',
            TypeScript: '#3178c6',
            PHP: '#777bb4',
            Laravel: '#ff2d20',
            HTML: '#e34c26',
            CSS: '#264de4',
            Python: '#3776ab',
            Java: '#b07219',
            'C#': '#178600',
            C: '#555555',
            'C++': '#f34b7d',
            Ruby: '#701516',
            Go: '#00add8',
            Swift: '#ffac45',
            Rust: '#dea584',
            Vue: '#41b883',
            React: '#61dafb',
        };
        return colors[lang] || '#A855F7'; // Default to accent purple
    };

    if (loading) {
        return (
            <div className="space-y-6 pt-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between">
                            <div className="h-4 w-24 bg-purple-100 dark:bg-purple-900/30 rounded animate-pulse" />
                            <div className="h-4 w-12 bg-purple-100 dark:bg-purple-900/30 rounded animate-pulse" />
                        </div>
                        <div className="h-2 w-full bg-purple-100 dark:bg-purple-900/30 rounded-full animate-pulse" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="py-12 text-center text-slate-600 dark:text-slate-400">{error}</div>;
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 pt-4">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Top Stack Proficiency</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Based on public GitHub repositories</p>
            </div>

            <div className="space-y-6">
                {languages.map((lang, index) => (
                    <motion.div
                        key={lang.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="group"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]"
                                    style={{ backgroundColor: getLanguageColor(lang.name) }}
                                />
                                <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    {lang.name}
                                </span>
                            </div>
                            <span className="text-xs font-mono text-slate-500">{lang.percentage}%</span>
                        </div>

                        <div className="h-2 w-full bg-purple-100 dark:bg-purple-900/20 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${lang.percentage}%` }}
                                transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
                                className="h-full rounded-full shadow-[0_0_15px_-3px_var(--shadow-color)]"
                                style={{
                                    backgroundColor: getLanguageColor(lang.name),
                                    '--shadow-color': getLanguageColor(lang.name)
                                }}
                            />
                        </div>

                        <div className="mt-1 flex justify-end">
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                                {lang.count} Projects
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {languages.length === 0 && (
                <div className="text-center py-12 text-slate-500">No language data found.</div>
            )}
        </div>
    );
};

export default GitHubTopLanguages;
