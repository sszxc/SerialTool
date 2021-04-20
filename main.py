import sys
from os import path
from tkinter import *
from PIL import Image, ImageTk


def getPath(filename):
    '''
    在debug/release两种模式下获取文件路径
    '''
    # 获取sys的'_MEIPASS'属性（打包模式），如果没有的话就返回绝对路径（调试模式）
    bundle_dir = getattr(sys, '_MEIPASS', path.abspath(path.dirname(__file__)))
    path_to_dat = path.join(bundle_dir, filename)
    return path_to_dat

root = Tk()

textLabel = Label(root,
                  text='请重试！\n您的操作不被允许！',  # 文字支持换行
                  justify=LEFT,  # 左对齐
                  padx=10,  # 左边距10px
                  pady=10)  # 右边距10px
textLabel.pack(side=LEFT)

#显示图片
wifi_img = Image.open(getPath('img/02.jpg'))
photo = ImageTk.PhotoImage(wifi_img)

imageLabel = Label(root, image=photo)

imageLabel.pack(side=RIGHT)

mainloop()
