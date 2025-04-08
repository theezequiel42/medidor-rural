declare module 'cleave.js/react' {
    import * as React from 'react'
  
    interface CleaveOptions {
      phone?: boolean
      phoneRegionCode?: string
      delimiter?: string
      blocks?: number[]
      numericOnly?: boolean
      prefix?: string
      noImmediatePrefix?: boolean
      rawValueTrimPrefix?: boolean
      uppercase?: boolean
      lowercase?: boolean
      onValueChanged?: (event: any) => void
    }
  
    interface CleaveProps extends React.InputHTMLAttributes<HTMLInputElement> {
      options: CleaveOptions
      onChange?: React.ChangeEventHandler<HTMLInputElement>
    }
  
    const Cleave: React.FC<CleaveProps>
    export default Cleave
  }
  