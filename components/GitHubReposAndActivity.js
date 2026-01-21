'use client';

import { useEffect, useState } from 'react';

const GitHubReposAndActivity = ({ username, token }) => {
  const [activeTab, setActiveTab] = useState('repos');
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
      <div className="space-y-3 animate-fade-in">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200 group"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-base font-semibold text-purple-900 dark:text-purple-50 group-hover:text-purple-700 dark:group-hover:text-purple-100 transition-colors">
                    {repo.name}
                  </h4>
                  {repo.private && (
                    <span className="text-xs px-2 py-1 bg-purple-200 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded font-medium">
                      Private
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
                  {repo.description || 'No description provided'}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                  {repo.language && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400" />
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
          </a>
        ))}
      </div>
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
      <div className="space-y-4 animate-fade-in">
        {activity.map((event, index) => (
          <div
            key={`${event.id}-${index}`}
            className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200"
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
                      <a
                        key={idx}
                        href={`https://github.com/${event.repo.name}/commit/${commit.sha}`}
                        target="_blank"
                        rel="noopener noreferrer"
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
                      </a>
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
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Projects & Activity</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Repositories and recent commits</p>
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
          <span className="font-medium">View on GitHub</span>
        </a>
      </div>

      <div className="flex gap-2 border-b border-purple-200 dark:border-purple-800">
        <button
          onClick={() => setActiveTab('repos')}
          className={`px-4 py-3 font-semibold transition-all duration-200 border-b-2 ${activeTab === 'repos'
              ? 'border-purple-600 dark:border-purple-500 text-purple-900 dark:text-purple-50'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400'
            }`}
        >
          Repositories
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`px-4 py-3 font-semibold transition-all duration-200 border-b-2 ${activeTab === 'activity'
              ? 'border-purple-600 dark:border-purple-500 text-purple-900 dark:text-purple-50'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400'
            }`}
        >
          Recent Activity
        </button>
      </div>

      <div className="min-h-[300px]">
        {activeTab === 'repos' ? renderRepos() : renderActivity()}
      </div>
    </div>
  );
};

export default GitHubReposAndActivity;
