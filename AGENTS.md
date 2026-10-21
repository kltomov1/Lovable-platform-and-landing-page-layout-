<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the course landing page at `/` and the presentation at `/find-your-edge` so each experience remains independently accessible.
- Presentation slides share one 1920×1080 scaling component and central content registry; global `--slide-*` tokens control their design.
- The presentation’s current slide is URL-driven; generated sample narration uses one continuous audio asset and a shared timestamp registry to keep slide changes synchronized without playback gaps.
