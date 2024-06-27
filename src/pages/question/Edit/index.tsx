import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectComponentId } from '@/store/componentsReducer'
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData'
import EditCanvas from './EditCanvas'

const Edit: FC = () => {
  const dispatch = useDispatch()
  const { loading } = useLoadQuestionData()

  const handleCancelSelectId = () => {
    dispatch(setSelectComponentId(''))
  }

  return (
    <div
      className="h-[100vh] flex flex-col"
      style={{
        backgroundImage:
          'linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%)',
      }}
    >
      <div className="h-[60px] bg-white rounded-b-lg shadow-lg">Header</div>

      <div className="flex flex-auto py-[20px] px-[30px] ">
        <div className="w-[400px] bg-white rounded-2xl shadow-xl"></div>
        <div
          className="flex items-center justify-center flex-1"
          onClick={() => handleCancelSelectId()}
        >
          <div className="w-[400px] h-[650px]  overflow-hidden rounded-3xl bg-white shadow-xl py-4">
            <div className="h-full overflow-auto">
              <EditCanvas loading={loading}></EditCanvas>
            </div>
          </div>
        </div>
        <div className="w-[400px] bg-white rounded-2xl shadow-xl"></div>
      </div>
    </div>
  )
}

export default Edit
