<script lang="ts">
  import { toPng } from 'html-to-image'

  import Download from '$lib/icons/Download.svelte'

  interface Props {
    disabled: boolean
    id: string
    filename: string
  }

  let { disabled, id, filename }: Props = $props()

  async function screenshotDownload(document: Document, id: string, filename: string) {
    const el = document.querySelector(id)
    if (!el) return

    // @ts-ignore
    el.style.padding = '0.75rem'
    // @ts-ignore
    el.style.backgroundColor = '#1185FE'

    const downloadBtn = el.querySelector('#download-btn')
    if (downloadBtn) {
      downloadBtn.remove()
    }

    toPng(el as HTMLElement, { cacheBust: true })
      .then((dataUrl) => {
        // @ts-ignore
        el.style.padding = '0rem'
        // @ts-ignore
        el.style.backgroundColor = 'transparent'
        const link = document.createElement('a')
        link.download = filename
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.error(err)
      })
  }
</script>

<div>
  <button
    id="download-btn"
    {disabled}
    onclick={() => screenshotDownload(document, id, filename)}
    class="btn btn-square btn-ghost"><Download /></button
  >
  &nbsp;
</div>
