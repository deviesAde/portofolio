'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GitHubReposAndActivity = ({ username, token }) => {
  const [repos, setRepos] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState({ repos: true, activity: true });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const headers = token ? { Authorization: `token ${token}` } : {};
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`,
          { headers }
        );
        const data = await response.json();
        setRepos(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching repos:', err);
        setError('Failed to load repositories');
      } finally {
        setLoading((prev) => ({ ...prev, repos: false }));
      }
    };

    fetchRepos();
  }, [username, token]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const headers = token ? { Authorization: `token ${token}` } : {};
        const response = await fetch(
          `https://api.github.com/users/${username}/events`,
          { headers }
        );
        const data = await response.json();

        const pushEvents = data
          .filter((event) => event.type === 'PushEvent')
          .slice(0, 5);

        setActivity(pushEvents);
        setError(null);
      } catch (err) {
        console.error('Error fetching activity:', err);
      } finally {
        setLoading((prev) => ({ ...prev, activity: false }));
      }
    };

    fetchActivity();
  }, [username, token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const renderRepos = () => {
    if (loading.repos) {
      return (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-purple-100 dark:bg-purple-950/30 rounded-lg animate-pulse" />
          ))}
        </div>
      );
    }

    if (error) {
      return <div className="py-8 text-center text-slate-600 dark:text-slate-400">{error}</div>;
    }

    if (repos.length === 0) {
      return (
        <div className="py-8 text-center text-slate-600 dark:text-slate-400">
          No repositories found
        </div>
      );
    }

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="space-y-3"
      >
        {repos.map((repo) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
            }}
            whileHover={{ x: 5, backgroundColor: 'rgba(168, 85, 247, 0.05)' }}
            className="block p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-200 group"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-50 group-hover:text-purple-700 dark:group-hover:text-purple-100 transition-colors truncate">
                    {repo.name}
                  </h4>
                  {repo.private && (
                    <span className="text-xs px-2 py-1 bg-purple-200 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded font-medium">
                      Private
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
                  {repo.description || 'No description provided'}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                  {repo.language && (
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400" />
                      <span>{repo.language}</span>
                    </div>
                  )}

                  {repo.stargazers_count > 0 && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span>{repo.stargazers_count}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                    <span>{formatDate(repo.updated_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    );
  };

  const renderActivity = () => {
    if (loading.activity) {
      return (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-purple-100 dark:bg-purple-950/30 rounded-lg animate-pulse" />
          ))}
        </div>
      );
    }

    if (activity.length === 0) {
      return (
        <div className="py-8 text-center text-slate-600 dark:text-slate-400">
          No recent commits found
        </div>
      );
    }

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.12 } }
        }}
        className="space-y-4"
      >
        {activity.map((event, index) => (
          <motion.div
            key={`${event.id}-${index}`}
            variants={{
              hidden: { x: -20, opacity: 0 },
              visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
            }}
            whileHover={{ scale: 1.01, backgroundColor: 'rgba(168, 85, 247, 0.03)' }}
            className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-200 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mt-1">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12.75c0 .41.34.75.75.75h4.5c.41 0 .75-.34.75-.75m0 4.5c0 .41.34.75.75.75h4.5c.41 0 .75-.34.75-.75M3 19.5V5.25c0-.966.784-1.75 1.75-1.75h14.5c.966 0 1.75.784 1.75 1.75v14.25c0 .966-.784 1.75-1.75 1.75H4.75c-.966 0-1.75-.784-1.75-1.75Z" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <a
                    href={`https://github.com/${event.repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-purple-900 dark:text-purple-50 hover:text-purple-700 dark:hover:text-purple-100 transition-colors truncate"
                  >
                    {event.repo.name}
                  </a>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex-shrink-0">
                    {formatDate(event.created_at)}
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Pushed {event.payload.commits?.length || 0} commit{(event.payload.commits?.length || 0) !== 1 ? 's' : ''} to{' '}
                  <code className="font-mono text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded">
                    {event.payload.ref?.replace('refs/heads/', '') || 'main'}
                  </code>
                </p>

                {event.payload.commits && event.payload.commits.length > 0 && (
                  <div className="space-y-2 mt-3">
                    {event.payload.commits.slice(0, 2).map((commit, idx) => (
                      <motion.a
                        key={idx}
                        href={`https://github.com/${event.repo.name}/commit/${commit.sha}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 3 }}
                        className="block p-2 bg-purple-100 dark:bg-purple-900/50 rounded text-sm hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors group"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-purple-400 dark:text-purple-600 mt-0.5 flex-shrink-0">→</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-slate-800 dark:text-slate-200 truncate group-hover:text-slate-900 dark:group-hover:text-slate-100">
                              {commit.message}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                              {commit.sha.substring(0, 7)}
                            </p>
                          </div>
                        </div>
                      </motion.a>
                    ))}

                    {event.payload.commits.length > 2 && (
                      <p className="text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                        +{event.payload.commits.length - 2} more
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto pt-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

        {/* Left Side: Projects (Smaller) */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center justify-between border-b border-purple-200 dark:border-purple-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              Repositories
            </h2>
          </div>
          <div className="min-h-[300px]">
            {renderRepos()}
          </div>
        </div>

        {/* Right Side: Recent Activity (Larger) */}
        <div className="md:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-purple-200 dark:border-purple-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
              
              Recent Energy
            </h2>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 underline underline-offset-4"
            >
              View on GitHub
            </a>
          </div>
          <div className="min-h-[300px]">
            {renderActivity()}
          </div>
        </div>

      </div>
    </div>
  );
};

export default GitHubReposAndActivity;
