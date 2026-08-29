import { useState } from 'react'
import { useStore } from '../store/store'
import { formatWhen } from '../store/derive'
import { TopBar } from '../components/TopBar'
import { Screen } from '../components/Screen'
import { useToast } from '../components/Toast'

export function Community() {
  const { state, dispatch } = useStore()
  const toast = useToast()
  const [draft, setDraft] = useState('')
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyDraft, setReplyDraft] = useState('')

  return (
    <Screen>
      <TopBar title="Community" subtitle="Say the true thing. Nobody here needs the tidy version." />

      <div className="sp-card">
        <div className="sp-composer">
          <textarea
            rows={3}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="What are you carrying this week?"
          />
          <button
            type="button"
            className="sp-btn"
            disabled={!draft.trim()}
            onClick={() => {
              dispatch({ type: 'post/add', body: draft.trim() })
              setDraft('')
              toast('Posted')
            }}
          >
            Share
          </button>
        </div>
        <p className="sp-hint">Posts stay on this device — this is a local space, not a public feed.</p>
      </div>

      <div className="sp-card">
        <div className="sp-stack">
          {state.posts.map((post) => (
            <article key={post.id} className="sp-post">
              <div className="sp-post__head">
                <div className="sp-post__author">{post.author}</div>
                <div className="sp-post__time">{formatWhen(post.at)}</div>
              </div>
              <p className="sp-post__body">{post.body}</p>
              <div className="sp-post__actions">
                <button
                  type="button"
                  className={`sp-chip${post.likedByMe ? ' sp-chip--on' : ''}`}
                  onClick={() => dispatch({ type: 'post/toggleLike', id: post.id })}
                >
                  ♥ {post.likes}
                </button>
                <button
                  type="button"
                  className="sp-chip"
                  onClick={() => {
                    setReplyTo(replyTo === post.id ? null : post.id)
                    setReplyDraft('')
                  }}
                >
                  Reply ({post.replies.length})
                </button>
                {post.author === state.settings.userName && (
                  <button
                    type="button"
                    className="sp-chip sp-chip--danger"
                    onClick={() => {
                      dispatch({ type: 'post/delete', id: post.id })
                      toast('Post deleted')
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>

              {post.replies.length > 0 && (
                <div className="sp-replies">
                  {post.replies.map((reply) => (
                    <div key={reply.id} className="sp-reply">
                      <div className="sp-reply__author">{reply.author}</div>
                      <div className="sp-reply__body">{reply.body}</div>
                      <div className="sp-reply__time">{formatWhen(reply.at)}</div>
                    </div>
                  ))}
                </div>
              )}

              {replyTo === post.id && (
                <div className="sp-composer sp-composer--inline">
                  <textarea
                    rows={2}
                    value={replyDraft}
                    onChange={(e) => setReplyDraft(e.target.value)}
                    placeholder="Write a reply…"
                  />
                  <button
                    type="button"
                    className="sp-btn"
                    disabled={!replyDraft.trim()}
                    onClick={() => {
                      dispatch({ type: 'post/reply', id: post.id, body: replyDraft.trim() })
                      setReplyDraft('')
                      setReplyTo(null)
                      toast('Reply posted')
                    }}
                  >
                    Reply
                  </button>
                </div>
              )}
            </article>
          ))}
          {state.posts.length === 0 && <div className="sp-empty">No posts yet. Start one above.</div>}
        </div>
      </div>
    </Screen>
  )
}
