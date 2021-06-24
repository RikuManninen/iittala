
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { memo, useState, FC, useEffect, useRef } from 'react'
import { Input, FormGroup, FormMessage } from '@admin-bro/design-system'

import { EditPropertyProps } from 'admin-bro/src/frontend/components/property-type/base-property-props'
import { recordPropertyIsEqual } from 'admin-bro/src/frontend/components/property-type/record-property-is-equal'
import { PropertyLabel } from 'admin-bro/src/frontend/components/property-type/utils/property-label'

import { Editor } from '@tinymce/tinymce-react';

const Edit = (props) => {
  const { onChange, property, record } = props
  const propValue = record.params?.[property.path] ?? ''
  const [value, setValue] = useState(propValue)
  const error = record.errors?.[property.path]

  useEffect(() => {
    if (value !== propValue) {
      setValue(propValue)
    }
  }, [propValue])

  const editorRef = useRef(null);

  console.log(value)

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <FormGroup error={Boolean(error)}>
      <PropertyLabel property={property} />
      <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help ',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        disabled={property.isDisabled}
        value={value}
        onEditorChange={(newValue, editor) => setValue(newValue)}
        onBlur={() => onChange(property.path, value)}
        id={property.path}
        textareaName={property.path}
      />
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default memo(Edit, recordPropertyIsEqual)